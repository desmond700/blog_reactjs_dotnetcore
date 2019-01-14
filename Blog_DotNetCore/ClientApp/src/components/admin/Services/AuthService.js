import React, { Component } from 'react';

export class Auth {

  static authenticate() {
    this.isAuthenticated = true;
  }

  signOut() {
    this.isAuthenticated = false;
  }

  isAuthenticated = false
}
