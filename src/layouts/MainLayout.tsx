interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return <main className='min-h-screen px-4'>{children}</main>;
};

export default MainLayout;
