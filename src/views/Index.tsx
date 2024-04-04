import Slider from "../components/common/Slider";
import ItemList from "../components/products/ItemList";

const Index = (): JSX.Element => {
  const limit = 4;
  return (
    <>
      <Slider />
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
        <ItemList category="패션" limit={limit} />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <ItemList category="액세서리" limit={limit} />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <ItemList category="디지털" limit={limit} />
      </section>
    </>
  );
};

export default Index;
