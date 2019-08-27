import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Ximeng Zhang's Onboarding Task</h1>
        <p>Welcome to my application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p><a href='/FetchCustomer'>Link to Customer Page</a></p>
        <p><a href='/FetchProduct'>Link to Product Page</a></p>
        <p><a href='/FetchStore'>Link to Store Page</a></p>
        <p><a href='/FetchSale'>Link to Sale Page</a></p>
      </div>
    );
  }
}
