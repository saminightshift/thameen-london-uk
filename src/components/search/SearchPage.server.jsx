import {Heading, Input, PageHeader} from '~/components';
import {Layout} from '~/components/index.server';

export function SearchPage({searchTerm, children}) {
  return (
    <Layout>
      <PageHeader>
        <form className="relative flex w-full text-heading">
          <Input
            defaultValue={searchTerm}
            placeholder="Search"
            type="search"
            variant="search"
            name="q"
            className="focus:placeholder:opacity-0"
          />
        </form>
      </PageHeader>
      {children}
    </Layout>
  );
}
