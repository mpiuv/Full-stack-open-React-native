import { render, fireEvent, waitFor, screen } from "@testing-library/react-native";
import { UsernameAndPasswordContainer } from "../../components/UsernameAndPassword"; 

describe('SignIn', () => { 
  describe('UsernameAndPasswordContainer', () => { 
    it('onSubmit func should be called with correct arguments', async () => { 
      const onSubmit = jest.fn(); 
      const { getByTestId } = render(<UsernameAndPasswordContainer onSubmit={onSubmit} />); 
      fireEvent.changeText(getByTestId('username'), 'kalle');
      fireEvent.changeText(getByTestId('password'), 'password');
      fireEvent.press(await screen.findByText('Sign in'));
      await waitFor(async () => {
          expect(onSubmit).toHaveBeenCalledTimes(1);
          expect(onSubmit.mock.calls[0][0]).toEqual({username: 'kalle',password: 'password' });
        }
      );
    });
  });

});