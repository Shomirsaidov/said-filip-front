import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    product: {
        name: string;
        price: number;
        imageUrl?: string;
    };
}

interface CartState {
    items: CartItem[];
    totalPrice: number;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/cart");
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
});

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (productId: number, { dispatch, rejectWithValue }) => {
        try {
            await api.post("/cart/items", { productId, quantity: 1 });
            dispatch(fetchCart());
            return true;
        } catch (error: any) {
            if (error.response?.status === 401) {
                alert("Please sign in to add items to your cart.");
            }
            return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.totalPrice = action.payload.items.reduce(
                    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
                    0
                );
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
