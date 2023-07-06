import { useNavigate } from 'react-router-dom';

interface IUseNavigation {
  handleNavigate: (route: string) => void;
}

export const useNavigation = (): IUseNavigation => {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return {
    handleNavigate,
  };
};
