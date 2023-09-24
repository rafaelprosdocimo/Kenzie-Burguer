import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import * as z from 'zod';

interface ICartProviderProps{
    children: React.ReactNode;
}

interface ICartContext{
    products: Iitem[];
    cart: Iitem[];
    removeFromCart: (id: number) => void
    openModal: () => void;
    closeModal: () => void;
    modalBool: boolean;
    addToCart: (id: number) => void;
    cartTotal: number;
    onChange: (e: any) => void
    onSearch: (searchTerm: string) => void;
    value: string;
    filteredProducts: Iitem[];
    cleanCart: () => void;
}

export interface Iitem{
    id: number;
    name: string;
    category: string;
    price: number;
    img: string;
}



export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: ICartProviderProps) => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const getProducts = async () => {
        const token = localStorage.getItem("@TOKEN");
        try{
            const {data} = await api.get("/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data);
            setProducts(data);
        }
        catch(error){
            console.log(error);
        }
    }
    

    useEffect(() => {
        getProducts();

    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);



    useEffect(() => {
        console.log(cart)
    }, [cart]);

    const cartTotal = cart.reduce((acc: number, item: Iitem) => {
        return acc + item.price;
    }, 0)
    

    const addToCart = (id: number) => {
        const check = cart.every((item: any) => {
            return item.id !== id;
        })
        if(check){
            const data = products.filter((product: any) => {
                return product.id === id;
            })
            setCart([...cart, ...data])
        }
        else{
            alert("O produto já foi adicionado ao carrinho")
        }
    }

    const removeFromCart = (id: number) => {
        if(window.confirm("Deseja remover o produto do carrinho?")){
            cart.forEach((item: any, index: number) => {
                if(item.id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
        }
    }
    const cleanCart = () => {
        if(window.confirm("Deseja limpar o carrinho?")){
            setCart([])
        }
    }



    const [modalBool, setModalBool] = useState(false);
    const openModal = () => {
        setModalBool(true);
    }
    const closeModal = () => {
        console.log("Fechou")
        setModalBool(false);
    }



    const [value, setValue] = useState("");
    const categories = ([
        {name: "Sanduíches"
        , slug: "sanduiches"},
        
        {name: "Bebidas",
        slug: "bebidas"
        },
    ])


    const onChange = (e: any) => {
        console.log(filteredProducts)
        console.log(e.target.value)
        setValue(e.target.value);
        
    }

    const onSearch = (searchTerm: string) => {
        if (searchTerm == "") {
            setFilteredProducts(products);
            return;
        }
        const newProductList = products.filter((product:Iitem) => {
            if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return product.name.toLowerCase().includes(searchTerm.toLowerCase())
            }
            else if (product.category.toLowerCase().includes(searchTerm.toLowerCase())) {
            
            return product.category.toLowerCase().includes(searchTerm.toLowerCase())
            }
        })
        setFilteredProducts(newProductList);
    }


    return(
        <CartContext.Provider value={{cleanCart,filteredProducts,value,onChange,onSearch,cartTotal,removeFromCart,cart,addToCart ,products, modalBool, openModal, closeModal}}>
            {children}
        </CartContext.Provider>
    )
}