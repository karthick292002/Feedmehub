import { motion } from 'framer-motion';
import { Heart, ExternalLink, Clock, Star, Play, Book, TrendingUp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { addToFavorites, removeFromFavorites } from '@/store/slices/favoritesSlice';
import { ContentItem } from '@/store/slices/contentSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  item: ContentItem;
  index?: number;
  isDragging?: boolean;
}

export function ContentCard({ item, index = 0, isDragging = false }: ContentCardProps) {
  const dispatch = useAppDispatch();
  const favoriteItems = useAppSelector((state) => state.favorites.items);
  const isFavorite = favoriteItems.some(fav => fav.id === item.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(item.id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  const getTypeIcon = () => {
    switch (item.type) {
      case 'movie':
        return <Play className="h-4 w-4" />;
      case 'music':
        return <Play className="h-4 w-4" />;
      case 'news':
        return <Book className="h-4 w-4" />;
      case 'social':
        return <Star className="h-4 w-4" />;
      default:
        return <Book className="h-4 w-4" />;
    }
  };

  const getActionText = () => {
    switch (item.type) {
      case 'movie':
        return 'Watch Now';
      case 'music':
        return 'Play Now';
      case 'news':
        return 'Read More';
      case 'social':
        return 'View Post';
      default:
        return 'Learn More';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group",
        isDragging && "opacity-50 transform rotate-2"
      )}
    >
      <Card className="content-card overflow-hidden h-full">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            whileHover={{ scale: 1.05 }}
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Type Badge */}
          <Badge
            className="absolute top-3 left-3 bg-primary/90 text-primary-foreground backdrop-blur-sm"
          >
            {getTypeIcon()}
            <span className="ml-1 capitalize">{item.type}</span>
          </Badge>

          {/* Trending Badge */}
          {item.isTrending && (
            <Badge
              className="absolute top-3 right-3 bg-dashboard-accent/90 text-dashboard-accent-foreground backdrop-blur-sm"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleFavorite}
            className={cn(
              "absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300",
              "bg-background/80 backdrop-blur-sm hover:bg-background/90",
              isFavorite && "text-favorite opacity-100"
            )}
          >
            <motion.div
              animate={{ scale: isFavorite ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
            </motion.div>
          </Button>
        </div>

        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {item.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3" />
              <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
            </div>
            
            {item.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-current text-yellow-500" />
                <span>{item.rating}</span>
              </div>
            )}
          </div>

          {/* Source */}
          {item.source && (
            <div className="text-xs text-muted-foreground mb-3">
              Source: {item.source}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full btn-hero"
              onClick={() => window.open(item.url, '_blank')}
            >
              {getActionText()}
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}