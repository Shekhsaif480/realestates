import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const useAuthCheck = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const validateLogin = () => {
        if (!user) {
            alert("You must log in first before adding property.");
            return false;
        }
        return true;
    };

    return { user, loading, validateLogin };
};

export default useAuthCheck;
