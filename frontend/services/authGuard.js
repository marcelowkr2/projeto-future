import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthGuard = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default AuthGuard;
