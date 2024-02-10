import { createContext, useEffect, useState } from "react";

export let AppContext = createContext();
function AppContextProvider({children}){
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState();
    //console.log("user in context =?????", user);
    const [allPost, setAllPost] = useState([]);
    

    const value = {
        loading,
        setLoading,
        user, 
        setUser,
        allPost,
        setAllPost
    }
    useEffect(()=>{
        const storageuser=localStorage.getItem("myuser");
        if(storageuser!=null){
            setUser(JSON.parse(storageuser));
        }
    },[])
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;