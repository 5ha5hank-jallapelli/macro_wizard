import categoryHeader from '@/utils/categoryHeader';
import rowItem from '@/utils/rowItem';

export default function RowItemWithCategory({ label, items }) {
  return (
    <>
      { categoryHeader(label, items) }
      { rowItem(items)}
    </>
  )
}