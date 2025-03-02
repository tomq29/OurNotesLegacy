import { NavLink } from 'react-router-dom';

function Nav({ currentUser }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Домой
        </a>
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
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
