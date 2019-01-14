import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBlog, faComment, faCaretDown, faEdit, faFileUpload, faEnvelope, faCalendar, faComments, faCommentDots,
  faPencilAlt, faHome, faUser, faSignOutAlt, faListAlt, faFolderOpen, faThumbsUp, faCommentAlt
} from '@fortawesome/free-solid-svg-icons';
import { AdminMakePostLayout } from './hoc/layout/admin/NavAsideLayout';
import { AdminNavLayout } from './hoc/layout/admin/NavLayout';
import { DefaultAsideLayout } from './hoc/layout/blog/NavAsideLayout';
import { DefaultLayout } from './hoc/layout/blog/NavLayout';
import { UserLayout } from './hoc/layout/user/NavLayout';
import { UserAsideLayout } from './hoc/layout/user/NavAsideLayout';
import AppRoute from './components/AppRoute';
import AdminRoute from './components/admin/AdminRoute';
import UserRoute from './components/User/UserRoute';
import { Home } from './components/Home';
import { AsideHome } from './components/AsideHome';
import { MakeAPost } from './components/blog/components/MakeAPost';
import { AsideMakePostMenu } from './components/blog/components/AsideMakePostMenu';
import { Inbox } from './components/admin/components/Inbox';
import { Login } from './components/admin/components/Login';
import { Bloggers } from './components/admin/components/Bloggers';
import { Dashboard } from './components/admin/components/Dashboard';
import { ViewPosts } from './components/blog/components/ViewPosts';
import { ViewPost } from './components/blog/components/ViewPost';
import { Profile } from './components/admin/components/Profile';
import { Edit } from './components/admin/components/Edit';
import { UserProfile } from './components/User/Component/Profile';
import { UserActivity } from './components/User/Component/Activity';
import { AsideActivity } from './components/User/Component/AsideActivity';
import { SignIn } from './components/User/Component/Signin';
import { SignUp } from './components/User/Component/Signup';


library.add(faBlog, faComment, faCommentAlt, faCaretDown, faEdit, faFileUpload, faEnvelope, faPencilAlt, faHome, faUser, faSignOutAlt, faListAlt,
  faCalendar, faFolderOpen, faThumbsUp, faCommentDots, faComments);

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Switch>
        <AppRoute exact path="/" layout={DefaultAsideLayout} component={Home} asideComponent={<AsideHome />} />
        <AppRoute exact path="/user/signin" layout={DefaultLayout} component={SignIn} />
        <AppRoute path="/user/signup" layout={DefaultLayout} component={SignUp} />
        <UserRoute exact path="/user/:user_id/overview" layout={UserLayout} component={UserProfile} />
        <UserRoute path="/user/:user_id/edit" layout={UserLayout} component={UserProfile} />
        <UserRoute path="/user/:user_id/activity" layout={UserAsideLayout} component={UserActivity} asideComponent={<AsideActivity />} />
        <UserRoute path='/user/:user_id/post/makeapost' layout={UserAsideLayout} component={MakeAPost} asideComponent={<AsideMakePostMenu />} />
        <UserRoute exact path="/user/:user_id/post/view" layout={UserLayout} component={ViewPosts} />
        <UserRoute path="/user/:user_id/post/view/:post_id" layout={UserLayout} component={ViewPost} />
        <UserRoute path="/user/:user_id/inbox" layout={UserLayout} component={ViewPost} />
        <Route path="/admin/login" component={Login} />
        <AdminRoute exact path='/admin/dashboard' layout={AdminNavLayout} component={Dashboard} />
        <AdminRoute exact path='/admin/profile/:admin_id' layout={AdminNavLayout} component={Profile} />
        <AdminRoute path='/admin/bloggers/list' layout={AdminNavLayout} component={Bloggers} />
        <AdminRoute path='/admin/post/makeapost' layout={AdminMakePostLayout} component={MakeAPost} asideComponent={<AsideMakePostMenu />} />
        <AdminRoute exact path='/admin/post/view' layout={AdminNavLayout} component={ViewPosts} />
        <AdminRoute path='/admin/post/view/:post_id' layout={AdminNavLayout} component={ViewPost} />
        <AdminRoute path='/admin/post/edit/:post_id' layout={AdminNavLayout} component={Edit} />
        <AdminRoute path='/admin/inbox' layout={AdminNavLayout} component={Inbox} />
      </Switch>
    );
  }
}
