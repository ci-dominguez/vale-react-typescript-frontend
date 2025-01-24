import { Link, useLocation } from 'react-router';
import { links } from '../../utils/links';

const Footer = () => {
  const location = useLocation();
  const route = location.pathname;

  return (
    <footer className='flex flex-col p-4 md:p-6 lg:py-10 lg:px-10 xl:px-20 3xl:px-52'>
      <div className='flex flex-col gap-10 sm:flex-row sm:gap-20'>
        {links.map((group) => {
          return (
            <div key={group.name} className='flex flex-col gap-4'>
              <span className='font-editorial text-2xl'>{group.name}</span>
              <ul>
                {group.links.map((link) => {
                  return (
                    <li key={link.text} className='flex'>
                      <Link
                        to={link.to}
                        className={`group font-montreal text-lg flex items-center gap-1 self-start transition-colors duration-200 hover:text-seafoam ${
                          route != link.to && 'text-off'
                        }`}
                      >
                        <div
                          className={`bg-charcoal size-1 rounded-full group-hover:bg-seafoam transition-colors duration-200 ${
                            route === link.to ? 'bg-charcoal' : 'bg-white'
                          }`}
                        />
                        <span>{link.text}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
