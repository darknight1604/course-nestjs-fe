import { useAuthSync } from "@app/hooks/use-auth-sync";
import { LoadingPage } from "@app/pages";

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { loading } = useAuthSync();
  if (loading) {
    return <LoadingPage />;
  }
  return <>{children}</>;
};
export default AuthProvider;
