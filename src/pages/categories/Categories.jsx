import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CreateRequest from '~/components/create-request/CreateRequest'
import CategoryHeader from '~/components/category-header/CategoryHeader'
import CategoryItems from '~/components/category-items/CategoryItems'

const Categories = () => {
  return (
    <PageWrapper>
      <CreateRequest />
      <CategoryHeader />
      <CategoryItems />
    </PageWrapper>
  )
}

export default Categories
