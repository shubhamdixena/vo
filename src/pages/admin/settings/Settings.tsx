"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Textarea } from "../../../../components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { useToast } from "../../../../hooks/use-toast"
import { Save } from "lucide-react"

const Settings = () => {
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Charity Water Blog",
    siteDescription: "Official blog for charity: water",
    siteUrl: "https://blog.charitywater.org",
  })

  const [seoSettings, setSeoSettings] = useState({
    defaultTitle: "Charity Water Blog",
    defaultDescription: "Official blog for charity: water - bringing clean water to people in need",
    defaultKeywords: "charity, water, clean water, nonprofit",
    googleAnalyticsId: "",
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSeoSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setSaving(true)

    // In a real app, you would save these settings to your database
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Success",
        description: "Settings saved successfully",
      })
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-500 mt-1">Configure your blog settings</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralChange}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    name="siteUrl"
                    value={generalSettings.siteUrl}
                    onChange={handleGeneralChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="defaultTitle">Default Title</Label>
                  <Input
                    id="defaultTitle"
                    name="defaultTitle"
                    value={seoSettings.defaultTitle}
                    onChange={handleSeoChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="defaultDescription">Default Meta Description</Label>
                  <Textarea
                    id="defaultDescription"
                    name="defaultDescription"
                    value={seoSettings.defaultDescription}
                    onChange={handleSeoChange}
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
                </div>

                <div>
                  <Label htmlFor="defaultKeywords">Default Meta Keywords</Label>
                  <Input
                    id="defaultKeywords"
                    name="defaultKeywords"
                    value={seoSettings.defaultKeywords}
                    onChange={handleSeoChange}
                    className="mt-1"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                </div>

                <div>
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    name="googleAnalyticsId"
                    value={seoSettings.googleAnalyticsId}
                    onChange={handleSeoChange}
                    className="mt-1"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

export default Settings
