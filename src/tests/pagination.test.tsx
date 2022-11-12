import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithProviders } from '../test-utils/testing-library-utils';
import { WaitForLoadingToBeOver } from './sorting.test';

test('test paginate data', async() => {
  //render App
  renderWithProviders(<App />);
  await WaitForLoadingToBeOver()
  
  //hit next
  const nextButton = await screen.findByRole("button", {name:/next/i})
  userEvent.click(nextButton)
  //1st column 25
  //page number to 2

  const pageText = screen.getByText("page", {
    exact: false,
  });
  expect(pageText).toHaveTextContent("2");

  //hit next
  userEvent.click(nextButton)
  expect(pageText).toHaveTextContent("3");

  //1st column 50
  //page number to 3

  //hit prev
  const prevButton = await screen.findByRole("button", {name:/prev/i})

  userEvent.click(prevButton)
  expect(pageText).toHaveTextContent("2");
  //1st column 25
  //page number to 2
});
