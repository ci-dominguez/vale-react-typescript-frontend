import Nav from '../components/navigation/Nav';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <main className='min-h-screen bg-white text-charcoal px-4 md:px-6 lg:px-10 xl:px-52'>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
