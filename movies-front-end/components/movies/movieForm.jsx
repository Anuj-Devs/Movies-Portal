"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { deleteMovie } from "@/lib/api"
import { useParams, useRouter } from "next/navigation"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function MovieForm({ initial = {}, submitLabel, onSubmit, onCancel }) {
  const [preview, setPreview] = useState(initial?.posterDataUrl || initial?.posterUrl || null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formData, setFormData] = useState({
    title: initial?.title || "",
    publishingYear: initial?.year ? String(initial.year) : "",
    posterFile: undefined,
  })
  const [errors, setErrors] = useState({ title: "", publishingYear: "" })


  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    if (!initial || !initial._id) return

    setFormData({
      title: initial.title || "",
      publishingYear: initial.year ? String(initial.year) : "",
      posterFile: undefined,
    })
    setPreview(initial.posterDataUrl || initial.posterUrl || "")
  }, [initial])

  function handleFile(file) {
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
      setFormData((prev) => ({ ...prev, posterFile: file }))
    }
    reader.readAsDataURL(file)
  }

  function validate() {
    const newErrors = { title: "", publishingYear: "" }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    if (!formData.publishingYear.trim()) {
      newErrors.publishingYear = "Publishing year is required"
    } else if (!/^\d{4}$/.test(formData.publishingYear.trim())) {
      newErrors.publishingYear = "Enter a valid 4-digit year"
    }

    setErrors(newErrors)
    return !newErrors.title && !newErrors.publishingYear
  }

  async function submit() {
    if (!validate()) return

    setSubmitting(true)
    try {
      await onSubmit({
        title: formData.title,
        year: Number(formData.publishingYear),
        posterDataUrl: preview || initial?.posterDataUrl || "",
      })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    try {
      setDeleting(true)
      await deleteMovie(params.id)
      router.push("/movies")
    } catch (err) {
      console.error("Delete failed:", err)
      alert(err?.message || "Failed to delete movie.")
    } finally {
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(320px,420px)] gap-10">
      {/* Poster upload / preview */}
      <div
        className={`
          relative aspect-square rounded-xl border border-dashed border-white/40 bg-white/5 grid place-items-center text-center text-foreground/70
          transition-all duration-200
          ${isDragOver ? "scale-105 bg-white/10 border-white/60" : ""}
        `}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)
          handleFile(e.dataTransfer.files?.[0])
        }}
        role="region"
        aria-label="Poster dropzone"
      >
        {preview ? (
          <img
            src={preview}
            alt="Poster preview"
            className="absolute inset-0 h-full w-full object-cover rounded-xl"
          />
        ) : (
          <div className="space-y-2 flex flex-col items-center justify-center">
            <AiOutlineCloudUpload className="text-4xl" />
            <p>Drop an image here or click here to upload image</p>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="absolute inset-0 rounded-xl"
          aria-label="Choose file"
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <Input
          placeholder="Title"
          className="h-11 bg-input text-foreground/90 placeholder:text-foreground/50 border border-border rounded-lg"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value })
            setErrors({ ...errors, title: "" })
          }}
        />
        {errors.title && (
          <p className="text-sm text-[var(--destructive)] font-semibold -mt-4 pl-1">
            {errors.title}
          </p>
        )}

        <Input
          placeholder="Publishing year"
          className="h-11 bg-input text-foreground/90 placeholder:text-foreground/50 border border-border rounded-lg"
          value={formData.publishingYear}
          onChange={(e) => {
            setFormData({ ...formData, publishingYear: e.target.value })
            setErrors({ ...errors, publishingYear: "" })
          }}
        />
        {errors.publishingYear && (
          <p className="text-sm text-[var(--destructive)] font-semibold -mt-4 pl-1">
            {errors.publishingYear}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            onClick={onCancel}
            variant="ghost"
            className="ghost-btn font-semibold cursor-pointer h-11 px-6 rounded-lg"
          >
            Cancel
          </Button>
          {initial?._id && (
            <Button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white h-11 px-6 rounded-lg font-semibold cursor-pointer"
            >
              Delete
            </Button>
          )}
          <Button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="brand-btn cursor-pointer h-11 px-6 rounded-lg font-semibold"
          >
            {submitting ? <AiOutlineLoading3Quarters className="animate-spin text-lg" /> : submitLabel}
          </Button>
        </div>
      </div>

      {/* ✅ Local confirmation popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl p-6 w-[90%] max-w-sm shadow-xl">
            <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
            <p className="text-gray-600 mb-6">
              Once deleted, this movie cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 cursor-pointer text-black hover:bg-gray-300 rounded-lg px-4 h-10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded-lg px-4 h-10"
              >
                {deleting ? <AiOutlineLoading3Quarters className="animate-spin text-lg" /> : "Yes, Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
