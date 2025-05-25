"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Pause,
  RotateCcw,
  Search,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Circle,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Maximize2,
} from "lucide-react"

export default function Component() {
  const [selectedTest, setSelectedTest] = useState("should display welcome message")
  const [expandedFolders, setExpandedFolders] = useState(new Set(["tests", "example.spec.ts"]))
  const [watchedTests, setWatchedTests] = useState(new Set())
  const [filterText, setFilterText] = useState("")

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder)
    } else {
      newExpanded.add(folder)
    }
    setExpandedFolders(newExpanded)
  }

  const toggleWatch = (testName: string) => {
    const newWatched = new Set(watchedTests)
    if (newWatched.has(testName)) {
      newWatched.delete(testName)
    } else {
      newWatched.add(testName)
    }
    setWatchedTests(newWatched)
  }

  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-[#252526] border-r border-[#3e3e42] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#3e3e42]">
          <div className="flex items-center gap-2 mb-3">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-400 hover:bg-[#3e3e42]">
              <Play className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-[#3e3e42]">
              <Pause className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-[#3e3e42]">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <div className="flex-1" />
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-[#3e3e42]">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Filter tests by text or @tag"
              className="pl-10 bg-[#3c3c3c] border-[#3e3e42] text-white placeholder-gray-400"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 mt-3">
            <Badge variant="secondary" className="bg-[#3c3c3c] text-gray-300 hover:bg-[#4a4a4a]">
              <Circle className="h-3 w-3 mr-1 fill-current" />
              All
            </Badge>
            <Badge variant="secondary" className="bg-[#3c3c3c] text-gray-300 hover:bg-[#4a4a4a]">
              <CheckCircle className="h-3 w-3 mr-1 text-green-400" />
              Passed
            </Badge>
            <Badge variant="secondary" className="bg-[#3c3c3c] text-gray-300 hover:bg-[#4a4a4a]">
              <XCircle className="h-3 w-3 mr-1 text-red-400" />
              Failed
            </Badge>
          </div>
        </div>

        {/* Test Tree */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="space-y-1">
              {/* Tests folder */}
              <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#3e3e42] rounded cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => toggleFolder("tests")}
                >
                  {expandedFolders.has("tests") ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </Button>
                <span className="text-sm">tests</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-auto hover:bg-[#4a4a4a]"
                  onClick={() => toggleWatch("tests")}
                >
                  {watchedTests.has("tests") ? (
                    <Eye className="h-3 w-3 text-blue-400" />
                  ) : (
                    <EyeOff className="h-3 w-3 text-gray-500" />
                  )}
                </Button>
              </div>

              {expandedFolders.has("tests") && (
                <div className="ml-4 space-y-1">
                  {/* example.spec.ts */}
                  <div className="flex items-center gap-1 py-1 px-2 hover:bg-[#3e3e42] rounded cursor-pointer">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => toggleFolder("example.spec.ts")}
                    >
                      {expandedFolders.has("example.spec.ts") ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </Button>
                    <span className="text-sm">example.spec.ts</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-auto hover:bg-[#4a4a4a]"
                      onClick={() => toggleWatch("example.spec.ts")}
                    >
                      {watchedTests.has("example.spec.ts") ? (
                        <Eye className="h-3 w-3 text-blue-400" />
                      ) : (
                        <EyeOff className="h-3 w-3 text-gray-500" />
                      )}
                    </Button>
                  </div>

                  {expandedFolders.has("example.spec.ts") && (
                    <div className="ml-4 space-y-1">
                      <div 
                        className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer ${
                          selectedTest === "should display welcome message" ? "bg-[#094771]" : "hover:bg-[#3e3e42]"
                        }`}
                        onClick={() => setSelectedTest("should display welcome message")}
                      >
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-sm">should display welcome message</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-auto hover:bg-[#4a4a4a]"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleWatch("should display welcome message")
                          }}
                        >
                          {watchedTests.has("should display welcome message") ? (
                            <Eye className="h-3 w-3 text-blue-400" />
                          ) : (
                            <EyeOff className="h-3 w-3 text-gray-500" />
                          )}
                        </Button>
                      </div>
                      
                      <div 
                        className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer ${
                          selectedTest === "should navigate to about page" ? "bg-[#094771]" : "hover:bg-[#3e3e42]"
                        }`}
                        onClick={() => setSelectedTest("should navigate to about page")}
                      >
                        <XCircle className="h-3 w-3 text-red-400" />
                        <span className="text-sm">should navigate to about page</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-auto hover:bg-[#4a4a4a]"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleWatch("should navigate to about page")
                          }}
                        >
                          {watchedTests.has("should navigate to about page") ? (
                            <Eye className="h-3 w-3 text-blue-400" />
                          ) : (
                            <EyeOff className="h-3 w-3 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Timeline */}
        <div className="h-16 bg-[#2d2d30] border-b border-[#3e3e42] p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Timeline</span>
            </div>
            <div className="flex-1 bg-[#3c3c3c] h-6 rounded relative">
              <div className="absolute left-2 top-1 bottom-1 w-8 bg-blue-500 rounded-sm"></div>
              <div className="absolute left-12 top-1 bottom-1 w-4 bg-green-500 rounded-sm"></div>
              <div className="absolute left-18 top-1 bottom-1 w-6 bg-yellow-500 rounded-sm"></div>
              <div className="absolute left-26 top-1 bottom-1 w-3 bg-red-500 rounded-sm"></div>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-[#3e3e42]">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex-1">
          <Tabs defaultValue="actions" className="h-full flex flex-col">
            <TabsList className="bg-[#2d2d30] border-b border-[#3e3e42] rounded-none h-12 p-0">
              <TabsTrigger value="actions" className="data-[state=active]:bg-[#1e1e1e] rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500">
                Actions
              </TabsTrigger>
              <TabsTrigger value="call" className="data-[state=active]:bg-[#1e1e1e] rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500">
                Call
              </TabsTrigger>
              <TabsTrigger value="log" className="data-[state=active]:bg-[#1e1e1e] rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500">
                Log
              </TabsTrigger>
              <TabsTrigger value="errors" className="data-[state=active]:bg-[#1e1e1e] rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500">
                Errors
              </TabsTrigger>
              <TabsTrigger value="console" className="data-[state=active]:bg-[#1e1e1e] rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500">
                Console
              </TabsTrigger>
              <TabsTrigger value="network" className="data-[state=active]:bg-[#1e1e1e] rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500">
                Network
              </TabsTrigger>
              <TabsTrigger value="source" className="data-[state=active]:bg-[#1e1e1e] rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500">
                Source
              </TabsTrigger>
            </TabsList>

            <TabsContent value="actions" className="flex-1 p-4 m-0">
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-[#2d2d30] rounded hover:bg-[#3e3e42] cursor-pointer">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-mono">page.goto('http://localhost:3000')</span>
                  <span className="text-xs text-gray-400 ml-auto">245ms</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#2d2d30] rounded hover:bg-[#3e3e42] cursor-pointer">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-mono">page.locator('h1').click()</span>
                  <span className="text-xs text-gray-400 ml-auto">89ms</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#2d2d30] rounded hover:bg-[#3e3e42] cursor-pointer">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-mono">expect(page.locator('h1')).toHaveText('Welcome')</span>
                  <span className="text-xs text-gray-400 ml-auto">156ms</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#2d2d30] rounded hover:bg-[#3e3e42] cursor-pointer">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-mono">page.locator('a[href="/about"]').click()</span>
                  <span className="text-xs text-gray-400 ml-auto">67ms</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="call" className="flex-1 p-4 m-0">
              <div className="space-y-4">
                <div className="bg-[#2d2d30] p-4 rounded">
                  <h3 className="text-sm font-semibold mb-2">Call Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-400">Method:</span> click</div>
                    <div><span className="text-gray-400">Locator:</span> page.locator('h1')</div>
                    <div><span className="text-gray-400">Duration:</span> 89ms</div>
                    <div><span className="text-gray-400">Strict:</span> true</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="log" className="flex-1 p-4 m-0">
              <ScrollArea className="h-full">
                <div className="space-y-1 font-mono text-xs">
                  <div className="text-gray-400">[2024-01-15 10:30:15] Starting test: should display welcome message</div>
                  <div className="text-blue-400">[2024-01-15 10:30:15] Navigating to http://localhost:3000</div>
                  <div className="text-green-400">[2024-01-15 10:30:15] Page loaded successfully</div>
                  <div className="text-yellow-400">[2024-01-15 10:30:16] Waiting for element to be visible</div>
                  <div className="text-green-400">[2024-01-15 10:30:16] Element found and visible</div>
                  <div className="text-blue-400">[2024-01-15 10:30:16] Performing click action</div>
                  <div className="text-green-400">[2024-01-15 10:30:16] Click action completed</div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="errors" className="flex-1 p-4 m-0">
              <div className="bg-red-900/20 border border-red-500/30 p-4 rounded">
                <h3 className="text-red-400 font-semibold mb-2">Test Failed</h3>
                <pre className="text-sm text-red-300 whitespace-pre-wrap">
                  {`Error: expect(locator).toHaveText(expected)

Expected string: "About Us"
Received string: "About"

Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for locator('h1')
  - locator resolved to <h1>About</h1>
  - unexpected value "About"`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="console" className="flex-1 p-4 m-0">
              <ScrollArea className="h-full">
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-400">[Browser]</span>
                    <span>console.log: Page loaded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-400">[Browser]</span>
                    <span className="text-yellow-400">console.warn: Deprecated API usage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400">[Test]</span>
                    <span>Test step completed</span>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="network" className="flex-1 p-4 m-0">
              <div className="space-y-2">
                <div className="flex items-center gap-4 p-2 bg-[#2d2d30] rounded text-sm">
                  <span className="w-16 text-green-400">200</span>
                  <span className="w-16">GET</span>
                  <span className="flex-1">http://localhost:3000</span>
                  <span className="w-20 text-gray-400">245ms</span>
                  <span className="w-20 text-gray-400">2.1 KB</span>
                </div>
                <div className="flex items-center gap-4 p-2 bg-[#2d2d30] rounded text-sm">
                  <span className="w-16 text-green-400">200</span>
                  <span className="w-16">GET</span>
                  <span className="flex-1">http://localhost:3000/styles.css</span>
                  <span className="w-20 text-gray-400">89ms</span>
                  <span className="w-20 text-gray-400">1.5 KB</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="source" className="flex-1 p-4 m-0">
              <div className="bg-[#1e1e1e] p-4 rounded font-mono text-sm">
                <div className="space-y-1">
                  <div className="text-gray-400">1  import { test, expect } from '@playwright/test';</div>
                  <div className="text-gray-400">2</div>
                  <div className="text-gray-400">3  test('should display welcome message', async ({ page }) => {</div>
                  <div className="bg-yellow-500/20 text-white">4    await page.goto('http://localhost:3000');</div>
                  <div className="text-gray-400">5    await expect(page.locator('h1')).toHaveText('Welcome');</div>
                  <div className="text-gray-400">6  });</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
