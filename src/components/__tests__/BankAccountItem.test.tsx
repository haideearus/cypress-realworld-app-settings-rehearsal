import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BankAccountListItem from "../BankAccountItem";
import { BankAccount } from "../../models";

const bankAccount: BankAccount = {
  id: "bankaccount-1",
  uuid: "4b4b4b4b-4b4b-4b4b-4b4b-4b4b4b4b4b4b",
  userId: "user-1",
  bankName: "The Best Bank",
  accountNumber: "123456789",
  routingNumber: "987654321",
  isDeleted: false,
  createdAt: new Date(),
  modifiedAt: new Date(),
};

describe("BankAccountListItem Delete button", () => {
  test("has an accessible name that includes the bank name", () => {
    render(<BankAccountListItem bankAccount={bankAccount} deleteBankAccount={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Delete The Best Bank" })).toBeInTheDocument();
  });

  test("still shows the visible label 'Delete'", () => {
    render(<BankAccountListItem bankAccount={bankAccount} deleteBankAccount={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Delete The Best Bank" })).toHaveTextContent(
      "Delete"
    );
  });
});
