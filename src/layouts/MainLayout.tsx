import Nav from '../components/navigation/Nav';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <main className='min-h-screen px-4 bg-white text-charcoal'>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
