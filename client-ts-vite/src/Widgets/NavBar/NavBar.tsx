import { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App/providers/context/contextProvider';
import { useAppSelector } from '../../App/providers/store/store';


function NavBar(): JSX.Element {
  // const { currentUser } = useContext(AppContext);

  const currentUser = useAppSelector(state => state.currentUser.user)

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
      <div className="container-fluid">
        <div className="navbar-brand">
          <NavLink className={'nav-link'} to="/">
            Домой
          </NavLink>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        {currentUser ? (
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <div className="nav-link active">
                  Добрый день, {currentUser.login}
                </div>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/notes"
                >
                  Заметки
                </NavLink>
              </li>
              {/*  */}
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/questions"
                >
                  Вопросы
                </NavLink>
              </li>
              {/*  */}
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/quotes"
                >
                  Цитаты
                </NavLink>
              </li>

              {/*  */}
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/objectwriting"
                >
                  Object Writing
                </NavLink>
              </li>

              {/*  */}
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/auth/logout"
                >
                  Выйти
                </NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <div className="collapse navbar-collapse ">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/auth/login"
                >
                  Авторизация
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/auth/reg"
                >
                  Регистрация
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
