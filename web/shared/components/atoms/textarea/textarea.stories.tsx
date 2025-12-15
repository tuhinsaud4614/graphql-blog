import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Textarea from "./index";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "This textarea is disabled",
  },
};

export const WithValue: Story = {
  args: {
    value: "This is some initial text content.",
  },
};
