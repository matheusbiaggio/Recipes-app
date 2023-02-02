import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const [email, setEmail] = useState('');

  const history = useHistory();

  const handleClick = ({ target }) => {
    history.push(`/${target.name}`);
  };

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  useEffect(() => {
    const teste = JSON.parse(localStorage.getItem('user'));
    if (teste.email) {
      setEmail(teste.email);
    }
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <h2 data-testid="profile-email">{ email }</h2>
      <button
        type="button"
        name="done-recipes"
        onClick={ handleClick }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        name="favorite-recipes"
        onClick={ handleClick }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        name="favorite-recipes"
        onClick={ logout }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
