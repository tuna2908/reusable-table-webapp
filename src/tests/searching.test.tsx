import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { renderWithProviders } from "../test-utils/testing-library-utils";
import { WaitForLoadingToBeOver } from "./sorting.test";

test("test searching correct", async () => {
  //render App
  renderWithProviders(<App />);

  //enter input magazine
  const inputSearch = screen.getByPlaceholderText("enter type");
  userEvent.type(inputSearch, "magazine");

  const searchBtn = screen.getByTitle("searching");
  userEvent.click(searchBtn);

  await WaitForLoadingToBeOver();
  //test array all magazine
  const table = await screen.findByRole("table");

  // eslint-disable-next-line testing-library/no-node-access
  const tableDataRow = table.getElementsByClassName("table__data-row");

  expect(tableDataRow[0]).toHaveTextContent("magazine");

  //total 22
  expect(tableDataRow.length).toEqual(22);

  //search none existing type - image
  setTimeout(async () => {
    const searchBtn2 = await screen.findByTitle("searching");

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, "image");
    userEvent.click(searchBtn2);

    await WaitForLoadingToBeOver();

    //display no data found
    const nodata = await screen.findByRole("heading", {
      name: /no data to show/i,
    });
    expect(nodata).toBeInTheDocument();
  }, 1500);
});
