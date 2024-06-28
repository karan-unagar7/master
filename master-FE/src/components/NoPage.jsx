import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  font-size: 1.1rem;
  color: #fff;
  background-color: #007bff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoPage = () => {
  return (
    <NoPageContainer>
      <Heading>404 - Page Not Found</Heading>
      <Message>Sorry, the page you are looking for does not exist.</Message>
      <StyledLink to="/">Go to Home</StyledLink>
    </NoPageContainer>
  );
};

export default NoPage;