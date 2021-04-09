import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Header, HeaderProps } from '../components/Header/Header';

export default {
  title: 'Example/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  auth: {
    isAuthenticated: true,
    me: {
      email: "test@test.com",
      name: "Test Account"
    }
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  auth: null
};
