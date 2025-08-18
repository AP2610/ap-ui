import { Text } from '@ap/ui-kit';
import { Heading } from '@ap/ui-kit/heading';
import { Button } from '@ap/ui-kit/button';

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20">
      <h1 className="text-primary font-raleway text-4xl font-bold">Get Started now!</h1>
      <Button />
      <Text />
      <Heading />
    </div>
  );
};

export default Home;
