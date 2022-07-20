import Icons from "../common/Icons";
import LogoSVG from '../../assets/images/logo.svg';
import { Component } from "react";

class Sidebar extends Component {

  state = {
    isSidebarOpen: true,
  }

  toggleSidebar = () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    })
  }

  render() {
    return (
      <div className={`sidebar ${ this.state.isSidebarOpen ? '' : 'sidebar--hidden' }`}>
        <div className="logo">
          <svg width="81" height="40">
            <use xlinkHref={`${LogoSVG}#logo`} />
          </svg>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Icons
                  name='lightning'
                  color='#666666'
                  size='34'
                  className='link-sidebar'
                />
              Звонки
            </li>
            <li>
              <Icons
                  name='okdesk'
                  color='#666666'
                  size='34'
                  className='link-sidebar'
                />
              Okdesk
            </li>
            <li>
              <Icons
                  name='letter'
                  color='#666666'
                  size='34'
                  className='link-sidebar'
                />
              SMS
            </li>
          </ul>
        </nav>
        <button onClick={this.toggleSidebar} className="toggle-sidebar">
          <Icons
            name='arrow'
            color='#666666'
            size='30'
            className='button-sidebar'
          />
          Свернуть
        </button>
      </div>
    )
  }
}

export default Sidebar;