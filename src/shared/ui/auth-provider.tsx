import { useAuthSync } from "@app/hooks/use-auth-sync";

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { loading } = useAuthSync();
  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};
export default AuthProvider;
