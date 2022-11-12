import {
  cleanup,
  screen,
} from "@testing-library/react";
import App from "../App";
import { renderWithProviders } from "../test-utils/testing-library-utils";
import { WaitForLoadingToBeOver } from "./sorting.test";

afterEach(cleanup);

test("render table correctly first time", async () => {
  renderWithProviders(<App />);

  //wait for loading ended
  await WaitForLoadingToBeOver()

  //test table have first row and last row - id: 1 and id: 25
  const table = await screen.findByRole("table");

  // eslint-disable-next-line testing-library/no-node-access
  const tableDataRow = table.getElementsByClassName("table__data-row");

  expect(tableDataRow.length).toEqual(25);

  const firstColumn = tableDataRow[0];
  expect(firstColumn).toHaveTextContent("1");

  const lastColumn = tableDataRow[24];
  expect(lastColumn).toHaveTextContent("25");

  //test total - 100
  const totalText = screen.getByText(/total of/i, {
    exact: false,
  });
  expect(totalText).toHaveTextContent("100");

  //test current page - first page
  const pageText = screen.getByText("page", {
    exact: false,
  });
  expect(pageText).toHaveTextContent("1");
});
