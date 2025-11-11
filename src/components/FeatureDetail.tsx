import { ReactNode } from "react";

interface FeatureDetailProps {
  title: string;
  subtitle: string;
  description: string;
  reverse?: boolean;
  children?: ReactNode;
}

export const FeatureDetail = ({
  title,
  subtitle,
  description,
  reverse = false,
  children,
}: FeatureDetailProps) => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } gap-12 items-center`}
        >
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
            <h3 className="text-2xl text-primary mb-6">{subtitle}</h3>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
          
          <div className="flex-1">
            <div className="bg-card border border-border rounded-2xl p-8 aspect-video flex items-center justify-center">
              {children || (
                <div className="text-muted-foreground text-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-full mb-4 mx-auto animate-pulse" />
                  <p>Feature Demo</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
