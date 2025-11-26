'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { usePlugin, usePluginSettings, updatePluginSettings } from '@/hooks/usePlugins'

export default function PluginSettingsPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const pluginId = Array.isArray(params?.id) ? params.id[0] : params?.id
  const { data: plugin, isLoading: pluginLoading, error: pluginError } = usePlugin(pluginId || null)
  const {
    data: settings,
    isLoading: settingsLoading,
    error: settingsError,
  } = usePluginSettings(pluginId || null)
  const [settingsValue, setSettingsValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    if (settings) {
      setSettingsValue(JSON.stringify(settings, null, 2))
    }
  }, [settings])

  const handleSave = async () => {
    if (!pluginId) return
    setSaveError('')
    setIsSaving(true)
    try {
      const parsed = settingsValue ? JSON.parse(settingsValue) : {}
      await updatePluginSettings(pluginId, parsed)
      router.push('/admin/plugins')
    } catch (error) {
      setSaveError('Invalid JSON structure. Please ensure your settings are valid JSON.')
      setIsSaving(false)
    }
  }

  if (!pluginId) {
    return <div className="text-white">Plugin not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/plugins">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Plugin Settings</h1>
          <p className="text-gray-400 mt-1">Configure plugin behavior</p>
        </div>
      </div>

      {(pluginError || settingsError) && (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4">
            <p className="text-red-400">Failed to load plugin settings</p>
          </CardContent>
        </Card>
      )}

      {pluginLoading || settingsLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{plugin?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {plugin?.description && <p className="text-sm text-gray-400">{plugin.description}</p>}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Settings JSON</label>
              <Textarea
                value={settingsValue}
                onChange={(e) => setSettingsValue(e.target.value)}
                rows={16}
              />
              <p className="text-xs text-gray-500">Edit the JSON configuration for this plugin.</p>
            </div>

            {saveError && <p className="text-sm text-red-400">{saveError}</p>}

            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-indigo-500 hover:bg-indigo-600" disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
