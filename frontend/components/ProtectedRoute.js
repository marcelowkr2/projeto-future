import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { CircularProgress, Container, Box } from "@mui/material";


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box mt={5} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return user ? children : null;
};

export default ProtectedRoute;
