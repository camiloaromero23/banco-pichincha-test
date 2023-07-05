import { useNavigate } from 'react-router-dom';

interface IUseAddProduct {
  handleAddClick: () => void;
}

export const useAddProduct = (): IUseAddProduct => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/product');
  };

  return {
    handleAddClick,
  };
};
