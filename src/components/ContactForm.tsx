"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Send } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

const WHATSAPP_NUMBER = "212771450503";

const totalSteps = 3;
const defaultLabels: Dictionary["contactForm"] = {
  projectTypes: ["Site web", "Identité de marque", "Communication", "Autre"],
  introStep: "Une question a la fois pour un brief plus fluide.",
  introSimple: "Tous les champs sur un seul ecran.",
  simpleMode: "Retour au formulaire simple",
  guidedMode: "Formulaire guide (recommande)",
  successTitle: "Merci ! Votre demande a ete envoyee",
  successBody:
    "Nous avons prepare votre brief. Vous pouvez aussi continuer la discussion directement sur WhatsApp.",
  whatsappIntro: "Bonjour INNOVMARK, je souhaite envoyer une demande.",
  projectTypeLabel: "Type de projet",
  projectLabel: "Projet",
  nameLabel: "Nom",
  emailLabel: "Email",
  phoneLabel: "Telephone",
  stepLabel: "Etape",
  projectTypeQuestion: "Quel type de projet ?",
  projectQuestion: "Parlez-nous de votre projet",
  projectPlaceholder: "Quelques lignes suffisent: objectif, contexte, delai...",
  infoTitle: "Vos informations",
  back: "Retour",
  next: "Suivant",
  send: "Envoyer",
  messageLabel: "Message",
  messagePlaceholder: "Decrivez brievement votre besoin.",
  submitRequest: "Envoyer la demande",
  choose: "Choisir",
  whatsapp: "WhatsApp",
};

type FormMode = "step" | "simple";

type Brief = {
  projectType: string;
  message: string;
  name: string;
  email: string;
  phone: string;
};

const initialBrief: Brief = {
  projectType: "",
  message: "",
  name: "",
  email: "",
  phone: "",
};

export default function ContactForm({
  labels = defaultLabels,
}: {
  labels?: Dictionary["contactForm"];
}) {
  const [mode, setMode] = useState<FormMode>("simple");
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState<Brief>(initialBrief);
  const [submitted, setSubmitted] = useState(false);

  const progress = `${(step / totalSteps) * 100}%`;
  const whatsappUrl = useMemo(() => {
    const message = [
      labels.whatsappIntro,
      "",
      `${labels.projectTypeLabel}: ${brief.projectType}`,
      "",
      `${labels.projectLabel}: ${brief.message}`,
      "",
      `${labels.nameLabel}: ${brief.name}`,
      `${labels.emailLabel}: ${brief.email}`,
      `${labels.phoneLabel}: ${brief.phone}`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [brief, labels]);

  const canContinue =
    (step === 1 && brief.projectType) ||
    (step === 2 && brief.message.trim().length > 2) ||
    (step === 3 && brief.name.trim() && brief.email.trim());

  const canSubmitSimple =
    brief.name.trim() &&
    brief.email.trim() &&
    brief.projectType &&
    brief.message.trim().length > 2;

  const updateBrief = (field: keyof Brief, value: string) => {
    setBrief((current) => ({ ...current, [field]: value }));
  };

  const switchMode = (nextMode: FormMode) => {
    setMode(nextMode);
    setStep(1);
  };

  const goNext = () => {
    if (!canContinue) return;
    setStep((current) => Math.min(totalSteps, current + 1));
  };

  const goBack = () => {
    setStep((current) => Math.max(1, current - 1));
  };

  const submitRequest = () => {
    setSubmitted(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const onStepSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canContinue) return;
    submitRequest();
  };

  const onSimpleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmitSimple) return;
    submitRequest();
  };

  if (submitted) {
    return (
      <div className="grid min-h-[430px] place-items-center text-center">
        <div className="max-w-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2.5 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 hover:scale-105">
            <Check className="h-5 w-5 opacity-100" strokeWidth={1.9} />
          </div>
          <h2 className="cinematic-text mt-7 text-3xl font-light tracking-tight text-slate-950 md:text-4xl">
            {labels.successTitle}
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {labels.successBody}
          </p>
          <WhatsAppButton href={whatsappUrl} className="mt-8" label={labels.whatsapp} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7 flex flex-col gap-3 rounded-2xl border border-blue-100/80 bg-white/72 p-3 shadow-[0_12px_34px_rgba(15,23,42,0.055)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between rtl-md-row">
        <p className="px-2 text-sm text-slate-600">
          {mode === "step" ? labels.introStep : labels.introSimple}
        </p>

        {mode === "step" ? (
          <button
            type="button"
            onClick={() => switchMode("simple")}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-blue-100/80 bg-white px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.1em] text-slate-700 shadow-[0_8px_22px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-[0_14px_34px_rgba(79,140,255,0.12)] md:tracking-[0.14em]"
          >
            {labels.simpleMode}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => switchMode("step")}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-blue-200/80 bg-blue-600 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.1em] text-[#fff] shadow-[0_14px_34px_rgba(79,140,255,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_18px_44px_rgba(79,140,255,0.28)] md:tracking-[0.14em]"
          >
            {labels.guidedMode}
          </button>
        )}
      </div>

      <div key={mode} className="animate-[fadeUp_0.36s_ease_forwards]">
        {mode === "step" ? (
          <StepForm
            brief={brief}
            canContinue={Boolean(canContinue)}
            goBack={goBack}
            goNext={goNext}
            onSubmit={onStepSubmit}
            progress={progress}
            returnToSimple={() => switchMode("simple")}
            step={step}
            updateBrief={updateBrief}
            whatsappUrl={whatsappUrl}
            labels={labels}
          />
        ) : (
          <SimpleForm
            brief={brief}
            canSubmit={Boolean(canSubmitSimple)}
            onSubmit={onSimpleSubmit}
            updateBrief={updateBrief}
            whatsappUrl={whatsappUrl}
            labels={labels}
          />
        )}
      </div>
    </div>
  );
}

function StepForm({
  brief,
  canContinue,
  goBack,
  goNext,
  onSubmit,
  progress,
  returnToSimple,
  step,
  updateBrief,
  whatsappUrl,
  labels,
}: {
  brief: Brief;
  canContinue: boolean;
  goBack: () => void;
  goNext: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  progress: string;
  returnToSimple: () => void;
  step: number;
  updateBrief: (field: keyof Brief, value: string) => void;
  whatsappUrl: string;
  labels: Dictionary["contactForm"];
}) {
  return (
    <form onSubmit={onSubmit} className="flex min-h-[430px] flex-col">
      <div>
        <div className="mb-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.12em] text-slate-500 md:tracking-[0.24em]">
          <span>{labels.stepLabel} {step}/{totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-blue-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-[#4F8CFF] to-cyan-300 transition-all duration-500 ease-out"
            style={{ width: progress }}
          />
        </div>
      </div>

      <div className="relative flex flex-1 items-center py-8 md:py-10">
        <div key={step} className="w-full animate-[fadeUp_0.38s_ease_forwards]">
          {step === 1 && (
            <ChoiceStep
              title={labels.projectTypeQuestion}
              options={labels.projectTypes}
              selected={brief.projectType}
              onSelect={(value) => updateBrief("projectType", value)}
            />
          )}

          {step === 2 && (
            <div>
              <StepTitle>{labels.projectQuestion}</StepTitle>
              <textarea
                value={brief.message}
                onChange={(event) => updateBrief("message", event.target.value)}
                rows={5}
                required
                placeholder={labels.projectPlaceholder}
                className={`${fieldClassName} mt-6 min-h-36 resize-y py-4 leading-6`}
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <StepTitle>{labels.infoTitle}</StepTitle>
              <div className="mt-6 grid gap-4">
                <Field
                  label={labels.nameLabel}
                  value={brief.name}
                  onChange={(value) => updateBrief("name", value)}
                  autoComplete="name"
                  required
                />
                <Field
                  label={labels.emailLabel}
                  type="email"
                  value={brief.email}
                  onChange={(value) => updateBrief("email", value)}
                  autoComplete="email"
                  required
                />
                <Field
                  label={labels.phoneLabel}
                  value={brief.phone}
                  onChange={(value) => updateBrief("phone", value)}
                  autoComplete="tel"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-blue-100/80 pt-5">
        <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center rtl-md-row">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-blue-100/80 bg-white/78 px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-slate-600 shadow-[0_8px_22px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:text-blue-700 disabled:pointer-events-none disabled:opacity-35 md:tracking-[0.16em]"
          >
            <ArrowLeft className="h-9 w-9 rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 hover:scale-105 rtl-arrow" />
            {labels.back}
          </button>

          {step < totalSteps ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-[#4F8CFF] to-cyan-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#fff] shadow-[0_14px_36px_rgba(79,140,255,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(79,140,255,0.32)] disabled:pointer-events-none disabled:opacity-35 md:tracking-[0.16em]"
            >
              {labels.next}
              <ArrowRight className="h-9 w-9 rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 hover:scale-105 rtl-arrow" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canContinue}
              className={primaryButtonClassName}
            >
              {labels.send}
              <Send className="h-9 w-9 rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 hover:scale-105" />
            </button>
          )}
        </div>

        <WhatsAppButton href={whatsappUrl} className="mt-5 w-full sm:w-auto" label={labels.whatsapp} />
        <button
          type="button"
          onClick={returnToSimple}
          className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-full border border-blue-100/80 bg-white/78 px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.1em] text-slate-600 shadow-[0_8px_22px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-[0_14px_34px_rgba(79,140,255,0.10)] sm:w-auto md:tracking-[0.14em]"
        >
          {labels.simpleMode}
        </button>
      </div>
    </form>
  );
}

function SimpleForm({
  brief,
  canSubmit,
  onSubmit,
  updateBrief,
  whatsappUrl,
  labels,
}: {
  brief: Brief;
  canSubmit: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  updateBrief: (field: keyof Brief, value: string) => void;
  whatsappUrl: string;
  labels: Dictionary["contactForm"];
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label={labels.nameLabel}
          value={brief.name}
          onChange={(value) => updateBrief("name", value)}
          autoComplete="name"
          required
        />
        <Field
          label={labels.emailLabel}
          type="email"
          value={brief.email}
          onChange={(value) => updateBrief("email", value)}
          autoComplete="email"
          required
        />
      </div>

      <Field
        label={labels.phoneLabel}
        value={brief.phone}
        onChange={(value) => updateBrief("phone", value)}
        autoComplete="tel"
      />

      <SelectField
        label={labels.projectTypeLabel}
        value={brief.projectType}
        onChange={(value) => updateBrief("projectType", value)}
        options={labels.projectTypes}
        emptyLabel={labels.choose}
      />

      <label className="grid gap-2">
        <span className="text-[10px] uppercase tracking-[0.12em] text-slate-500 md:tracking-[0.24em]">
          {labels.messageLabel}
        </span>
        <textarea
          value={brief.message}
          onChange={(event) => updateBrief("message", event.target.value)}
          rows={4}
          required
          placeholder={labels.messagePlaceholder}
          className={`${fieldClassName} min-h-32 resize-y py-4 leading-6`}
        />
      </label>

      <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <button type="submit" disabled={!canSubmit} className={primaryButtonClassName}>
          {labels.submitRequest}
          <Send className="h-9 w-9 rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 hover:scale-105" />
        </button>
        <WhatsAppButton href={whatsappUrl} label={labels.whatsapp} />
      </div>
    </form>
  );
}

function ChoiceStep({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: readonly string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <StepTitle>{title}</StepTitle>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = selected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`group min-h-20 rounded-2xl border px-5 py-4 text-start text-lg font-light tracking-tight shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-[0_18px_44px_rgba(79,140,255,0.12)] ${
                active
                  ? "border-blue-300/80 bg-blue-600 text-[#fff] shadow-[0_16px_44px_rgba(79,140,255,0.22)]"
                  : "border-blue-100/80 bg-white/82 text-slate-800"
              }`}
            >
              <span className="flex items-center justify-between gap-4">
                {option}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border p-1.5 opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 group-hover:scale-105 ${
                    active
                      ? "border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] text-[#4F8CFF]"
                      : "border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] text-[#4F8CFF]"
                  }`}
                >
                  <Check className="h-4 w-4 opacity-100" strokeWidth={2.2} />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="cinematic-text text-3xl font-light leading-tight tracking-tight text-slate-950 md:text-4xl">
      {children}
    </h2>
  );
}

const fieldClassName =
  "w-full rounded-2xl border border-blue-100/80 bg-white/88 px-4 text-sm text-slate-900 shadow-[0_8px_22px_rgba(15,23,42,0.045)] outline-none transition duration-300 placeholder:text-slate-400 focus:border-blue-400/70 focus:bg-white focus:shadow-[0_0_0_4px_rgba(79,140,255,0.12),0_14px_34px_rgba(79,140,255,0.10)]";

const primaryButtonClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-[#4F8CFF] to-cyan-500 px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.1em] text-[#fff] shadow-[0_14px_36px_rgba(79,140,255,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(79,140,255,0.32)] disabled:pointer-events-none disabled:opacity-35 md:tracking-[0.16em]";

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[10px] uppercase tracking-[0.12em] text-slate-500 md:tracking-[0.24em]">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={`${fieldClassName} min-h-[54px]`}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  emptyLabel = "Choisir",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  emptyLabel?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[10px] uppercase tracking-[0.12em] text-slate-500 md:tracking-[0.24em]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        className={`${fieldClassName} min-h-[54px]`}
      >
        <option value="" disabled className="bg-white text-slate-500">
          {emptyLabel}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-white text-slate-900">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function WhatsAppButton({
  href,
  label = "WhatsApp",
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-200/80 bg-white px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.1em] text-emerald-700 shadow-[0_10px_26px_rgba(16,185,129,0.10)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-[0_16px_38px_rgba(16,185,129,0.16)] md:tracking-[0.14em] ${className}`}
    >
      {label}
      <MessageCircle className="h-9 w-9 rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 hover:scale-105" strokeWidth={1.8} />
    </Link>
  );
}
