import { Meta, StoryObj } from "@storybook/nextjs-vite";

import Field, {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from ".";
import Input from "../../atoms/input";

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Sign In</FieldLegend>
          <FieldDescription>Sign in to the account</FieldDescription>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input id="username" type="text" placeholder="Max Leiter" />
                  <FieldDescription>
                    Choose a unique username for your account.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                  <Input id="password" type="password" placeholder="••••••••" />
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  ),
};
