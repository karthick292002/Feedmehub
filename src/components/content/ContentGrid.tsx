import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentItem } from '@/store/slices/contentSlice';
import { ContentCard } from './ContentCard';
import { ContentSkeleton } from './ContentSkeleton';

interface ContentGridProps {
  items: ContentItem[];
  loading?: boolean;
  onReorder?: (sourceIndex: number, destinationIndex: number) => void;
  title?: string;
  showDragHandle?: boolean;
}

export function ContentGrid({ 
  items, 
  loading = false, 
  onReorder, 
  title,
  showDragHandle = true 
}: ContentGridProps) {
  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !onReorder) return;
    
    onReorder(result.source.index, result.destination.index);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {title && (
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ContentSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-muted-foreground">
          <h3 className="text-lg font-medium mb-2">No content found</h3>
          <p>Try adjusting your preferences or search terms.</p>
        </div>
      </motion.div>
    );
  }

  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <ContentCard
          key={item.id}
          item={item}
          index={index}
        />
      ))}
    </div>
  );

  const draggableContent = onReorder && showDragHandle ? (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="content-grid" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
              snapshot.isDraggingOver ? 'bg-muted/20 rounded-lg p-2' : ''
            }`}
          >
            <AnimatePresence>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ContentCard
                        item={item}
                        index={index}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : content;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-foreground"
        >
          {title}
        </motion.h2>
      )}
      {draggableContent}
    </motion.div>
  );
}