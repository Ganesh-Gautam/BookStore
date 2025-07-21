import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
 

const  initialState ={
    books: [],
    loading: false, 
    hasMore: true,
    error:"",
    page:1, 
    filters: {
        title: '' 
    },
    favorites : JSON.parse(localStorage.getItem('favorites')) || [],

};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (page ) => {
        const res = await fetch(`https://api.freeapi.app/api/v1/public/books?page=${page}&limit=9`);
        const data = await res.json();
        if (!data.success) {
        throw new Error('Failed to fetch books');
        }  
        return {
        data: data.data.data,
        nextPage: !!data.data.nextPage,
        };
    }
);

const booksSlice= createSlice({
    name: 'books',
    initialState,
    reducers:{
        setFilters: (state, action)=>{
            state.filters={...state.filters,...action.payload};
        },
        toggleFavorite:(state,action)=>{
            const id= action.payload;
            const exists=state.favorites.includes(id);
            if(exists){
                state.favorites= state.favorites.filter(fid=> fid!==id);
            } else {
                state.favorites.push(id);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        resetBooks: (state)=>{
            state.books=[];
            state.page= 1;
            state.hasMore= true;
        },
        setBooks: (state, action) => {
            state.books.push(...action.payload);
        }
    },
    extraReducers: builder=>{
        builder
            .addCase(fetchBooks.pending, (state)=>{
                state.loading=true;
            })
            .addCase(fetchBooks.fulfilled , (state,action)=>{
                state.loading= false;
                const newBooks = action.payload.data.filter(
                    (newBook) => !state.books.some((b) => b.id === newBook.id)
                );
                state.books.push(...newBooks);
                state.hasMore= action.payload.nextPage;
                state.page+=1;               
            })
            .addCase (fetchBooks.rejected, (state, action)=>{
                state.loading= false;
                state.error= action.error.message;
            });    
    }
});
export const {setFilters, toggleFavorite, resetBooks, setBooks}= booksSlice.actions;
export default booksSlice.reducer;
