import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  getAllDocSlugs, 
  getDocWithHeadings, 
  getDocNavigation 
} from '@/lib/docs';
import { markdownToHtml } from '@/lib/markdown';
import { DocContent } from '@/components/DocContent';
import { TableOfContents } from '@/components/TableOfContents';
import { SearchTrigger } from '@/components/SearchDialog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocWithHeadings(slug);
  
  if (!doc) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDocWithHeadings(slug);
  
  if (!doc) {
    notFound();
  }

  const htmlContent = await markdownToHtml(doc.content);
  const { prev, next } = getDocNavigation(slug);

  return (
    <div className="flex">
      <DocContent
        title={doc.title}
        description={doc.description}
        htmlContent={htmlContent}
        prev={prev}
        next={next}
      />
      {/* Right sidebar - sticky with search + TOC */}
      <div className="hidden xl:block w-[var(--toc-width)] shrink-0 pr-8 pt-6">
        <div className="sticky top-6">
          <h2 className="text-sm font-semibold text-[var(--color-text)] mb-3">
            Documentation
          </h2>
          <SearchTrigger />
          <TableOfContents headings={doc.headings} />
        </div>
      </div>
    </div>
  );
}
