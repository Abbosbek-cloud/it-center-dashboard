import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import Kurslar from './mainComponents/Kurslar';
import Kitoblar from './mainComponents/Kitoblar';

const { Meta } = Card;
const { TabPane } = Tabs;

const Main = () => {
  const onChange = (key) => {
    // console.log(key);
  };
  const isAdmin = localStorage.getItem('userToken');
  const adminExist = localStorage.getItem('isAdminAuthenticated');

  const styles = {
    ul: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    link: {
      textDecoration: 'none',
    },
  };

  return (
    <>
      <nav className="container py-4 d-flex justify-content-between bg-dark text-light">
        <div>
          <ul style={styles.ul}>
            <li>
              <Link style={styles.link} className="h2 text-light" to="/">
                Asosiy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul style={styles.ul} className="d-flex justify-content-between">
            <li>
              <Link className="h3 me-2" style={styles.link} to="/login">
                Login
              </Link>
            </li>
            <li>
              {isAdmin || adminExist ? (
                <Link style={styles.link} className="h3" to={adminExist ? '/admin' : '/user'}>
                  Profil
                </Link>
              ) : (
                <Link style={styles.link} className="h3" to="/signup">
                  Sign Up
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <main className="container">
        <Kitoblar />
        <Kurslar />
      </main>
    </>
  );
};

export default Main;
