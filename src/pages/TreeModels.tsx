import { motion } from 'framer-motion';
import { TreeViewer } from '@/components/TreeViewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TreeModels = () => {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6">Interactive Tree Models</h1>
        <p className="text-gray-600 mb-8">
          Explore detailed 3D models of various tree species. Rotate, zoom, and examine different parts
          of the trees to learn about their unique characteristics.
        </p>

        <Tabs defaultValue="viewer" className="mb-8">
          <TabsList>
            <TabsTrigger value="viewer">3D Viewer</TabsTrigger>
            <TabsTrigger value="info">Species Information</TabsTrigger>
            <TabsTrigger value="seasons">Seasonal Changes</TabsTrigger>
          </TabsList>

          <TabsContent value="viewer" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tree Visualization</CardTitle>
                <CardDescription>
                  Interact with the 3D model using your mouse to rotate and zoom.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TreeViewer />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Species Details</CardTitle>
                <CardDescription>
                  Learn about the characteristics of different tree species.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Oak Tree</h3>
                    <p className="text-sm text-gray-600">
                      Known for their strength and longevity, oak trees can live for hundreds of years.
                      They provide essential habitats for wildlife and produce acorns.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Pine Tree</h3>
                    <p className="text-sm text-gray-600">
                      Evergreen conifers that maintain their needles year-round. They are well-adapted
                      to cold climates and produce distinctive pine cones.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seasons" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Changes</CardTitle>
                <CardDescription>
                  Observe how trees transform throughout the year.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
                    <Button
                      key={season}
                      variant="outline"
                      className="h-auto py-8 flex flex-col items-center"
                    >
                      <span className="text-lg font-semibold mb-2">{season}</span>
                      <span className="text-sm text-gray-600">
                        Click to view seasonal changes
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default TreeModels;