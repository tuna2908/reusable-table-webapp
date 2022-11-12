import {
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { renderWithProviders } from "../test-utils/testing-library-utils";

export const WaitForLoadingToBeOver = async () => {
  await waitForElementToBeRemoved(() =>
    screen.queryByRole("heading", { name: /loading/i })
  );
};
test("test sorting", async () => {
  renderWithProviders(<App />);
  await WaitForLoadingToBeOver();

  //hit sort id first page
  const sortIdButton = screen.getByAltText("id");
  userEvent.click(sortIdButton);
  await WaitForLoadingToBeOver();

  const table = await screen.findByRole("table");
  // eslint-disable-next-line testing-library/no-node-access
  const tableDataRow = table.getElementsByClassName("table__data-row");

  const firstRow = tableDataRow[0];
  const secondRow = tableDataRow[1];
  const thirdRow = tableDataRow[2];
  //test array have decremental order
  expect(firstRow).toHaveTextContent("100");
  expect(secondRow).toHaveTextContent("99");
  expect(thirdRow).toHaveTextContent("98");

  //hit sort again
  userEvent.click(sortIdButton);
  await WaitForLoadingToBeOver();
  const firstRow2 = tableDataRow[0];
  const secondRow2 = tableDataRow[1];
  const thirdRow2 = tableDataRow[2];
  //test array have incremental order
  expect(firstRow2).toHaveTextContent("1");
  expect(secondRow2).toHaveTextContent("2");
  expect(thirdRow2).toHaveTextContent("3");


});
