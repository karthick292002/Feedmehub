import { Card, CardContent, CardFooter } from '@/components/ui/card';

export function ContentSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-video bg-muted loading-shimmer" />
      
      <CardContent className="p-4">
        {/* Title Skeleton */}
        <div className="h-5 bg-muted loading-shimmer rounded mb-2" />
        <div className="h-4 bg-muted loading-shimmer rounded w-3/4 mb-3" />
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-muted loading-shimmer rounded" />
          <div className="h-3 bg-muted loading-shimmer rounded w-5/6" />
        </div>
        
        {/* Metadata Skeleton */}
        <div className="flex justify-between items-center mb-3">
          <div className="h-3 bg-muted loading-shimmer rounded w-1/4" />
          <div className="h-3 bg-muted loading-shimmer rounded w-1/6" />
        </div>
        
        {/* Source Skeleton */}
        <div className="h-3 bg-muted loading-shimmer rounded w-1/3" />
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {/* Button Skeleton */}
        <div className="h-10 bg-muted loading-shimmer rounded w-full" />
      </CardFooter>
    </Card>
  );
}