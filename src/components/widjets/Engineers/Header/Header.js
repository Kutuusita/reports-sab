import './Header.scss';

// import i11g from '../../../../images/widget.service/i-1-1-g.svg';
// import i12g from '../../../../images/widget.service/i-1-2-g.svg';
import i13g from '../../../../images/widget.service/i-1-3-g.svg';
// import i14g from '../../../../images/widget.service/i-1-4-g.svg';
import i11 from '../../../../images/widget.service/i-1-1.svg';
import i12 from '../../../../images/widget.service/i-1-2.svg';
// import i13 from '../../../../images/widget.service/i-1-3.svg';
import i14 from '../../../../images/widget.service/i-1-4.svg';

import Clock from './Clock';

const Header = () => {
  return (
    <header>
        <h1><img src={i13g} alt="Оперативная информация" /> Оперативная информация</h1>
        <div className="watch">
            <Clock />
            

            <div className="header-menu-item" title="Оперативная информация">
                <img src={i13g} alt="Оперативная информация" />
            </div>
            <a href="/service-orders" className="header-menu-item" title="Заявки из Telegram">
                <img src={i11} alt="Заявки из Telegram" />
            </a>
            <a href="/service-rating" className="header-menu-item" title="Рейтинг">
                <img src={i12} alt="Результат обзвона робота" />
            </a>
            <a href="/service-calls" className="header-menu-item" title="Запись разговоров с оценкой -3.0">
                <img src={i14} alt="Запись разговоров с оценкой -3.0" />
            </a>
        </div>
    </header>
  )
}

export default Header;