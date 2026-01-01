"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Globe, ExternalLink, Users, TrendingUp, Calendar, Youtube, Twitter, Instagram, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Creator, Product, creators } from '@/lib/data';

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'twitter':
      return <Twitter className="w-4 h-4" />;
    case 'youtube':
      return <Youtube className="w-4 h-4" />;
    case 'instagram':
      return <Instagram className="w-4 h-4" />;
    case 'linkedin':
      return <Linkedin className="w-4 h-4" />;
    case 'tiktok':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
        </svg>
      );
    default:
      return <Globe className="w-4 h-4" />;
  }
}

function ImageCarousel({ images, creatorName }: { images: string[]; creatorName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="relative aspect-[16/9] rounded-[16px] overflow-hidden border border-border-1 bg-ui-1">
        <Image
          src={images[currentIndex]}
          alt={`${creatorName} screenshot ${currentIndex + 1}`}
          fill
          className="object-cover"
        />
      </div>
      
      {images.length > 1 && (
        <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-ui-1/80 backdrop-blur-sm border border-border-1 rounded-[12px] hover:bg-ui-2 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-ui-1/80 backdrop-blur-sm border border-border-1 rounded-[12px] hover:bg-ui-2 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>
          
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-text-primary' : 'bg-border-2 hover:bg-text-tertiary'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <a 
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4 p-6 bg-ui-1 border border-border-1 rounded-[16px] hover:border-border-2 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {product.logoUrl && (
            <div className="w-10 h-10 rounded-[8px] overflow-hidden border border-border-1 bg-ui-2 shrink-0">
              <Image 
                src={product.logoUrl} 
                alt={product.name} 
                width={40} 
                height={40} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h4 className="text-[16px] font-semibold text-text-primary group-hover:opacity-80 transition-opacity">
              {product.name}
            </h4>
            <p className="text-[12px] text-text-tertiary">{product.type}</p>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-text-secondary transition-colors shrink-0" />
      </div>
      <p className="text-[14px] text-text-secondary leading-relaxed line-clamp-2">
        {product.seoShortDescription}
      </p>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-text-tertiary bg-ui-2 px-3 py-1 rounded-[8px]">
            {product.pricing}
          </span>
          {product.launchDate && (
            <span className="text-[12px] text-text-tertiary flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {product.launchDate}
            </span>
          )}
        </div>
    </a>
  );
}

const CreatorProfile = ({ creator }: { creator: Creator }) => {
  const socialEntries = Object.entries(creator.socials).filter(([, value]) => value);
  
  return (
    <div className="container pt-32 pb-24">
      <Link 
        href="/creators" 
        className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-[14px] font-medium">Back to all creators</span>
      </Link>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-border-1 shrink-0">
              <Image 
                src={creator.avatar} 
                alt={creator.name} 
                width={96} 
                height={96} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-6 max-w-3xl">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-[36px] md:text-[48px] font-bold text-text-primary tracking-tight leading-tight">
                      {creator.name}
                    </h1>
                    <span className="px-3 py-1 text-[12px] font-medium text-text-secondary bg-ui-2 rounded-[8px] border border-border-1">
                      {creator.category}
                    </span>
                  </div>
                  <p className="text-[16px] text-text-secondary">
                    {creator.role} {creator.location && `• ${creator.location}`}
                  </p>
                </div>
                
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  {creator.seoShortDescription}
                </p>
  
                    <div className="flex flex-wrap items-center gap-3">
                    <a 
                      href={creator.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 text-[14px] font-semibold text-white bg-text-primary rounded-[12px] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                    </a>
                    {socialEntries.map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-text-secondary bg-ui-1 border border-border-1 rounded-[12px] hover:bg-ui-2 hover:text-text-primary hover:border-border-2 transition-all shadow-sm"
                        title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                      >
                        <SocialIcon platform={platform} />
                      </a>
                    ))}
                    </div>
              </div>
            </div>
            
            {creator.gallery && creator.gallery.length > 0 && (
              <ImageCarousel images={creator.gallery} creatorName={creator.name} />
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {creator.newsletterSubscribers && (
            <div className="flex flex-col gap-2 p-5 bg-ui-1 border border-border-1 rounded-[12px]">
              <div className="flex items-center gap-2 text-text-tertiary">
                <Users className="w-4 h-4" />
                <span className="text-[12px] font-medium">Newsletter</span>
              </div>
              <p className="text-[20px] font-bold text-text-primary">{creator.newsletterSubscribers}</p>
            </div>
          )}
          {creator.socialMediaFollowers && (
            <div className="flex flex-col gap-2 p-5 bg-ui-1 border border-border-1 rounded-[12px]">
              <div className="flex items-center gap-2 text-text-tertiary">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[12px] font-medium">Followers</span>
              </div>
              <p className="text-[20px] font-bold text-text-primary">{creator.socialMediaFollowers}</p>
            </div>
          )}
          {creator.communitySize && (
            <div className="flex flex-col gap-2 p-5 bg-ui-1 border border-border-1 rounded-[12px]">
              <div className="flex items-center gap-2 text-text-tertiary">
                <Users className="w-4 h-4" />
                <span className="text-[12px] font-medium">Community</span>
              </div>
              <p className="text-[20px] font-bold text-text-primary">{creator.communitySize}</p>
            </div>
          )}
          {creator.foundingYear && (
            <div className="flex flex-col gap-2 p-5 bg-ui-1 border border-border-1 rounded-[12px]">
              <div className="flex items-center gap-2 text-text-tertiary">
                <Calendar className="w-4 h-4" />
                <span className="text-[12px] font-medium">Started</span>
              </div>
              <p className="text-[20px] font-bold text-text-primary">{creator.foundingYear}</p>
            </div>
          )}
        </div>

        {creator.notableMetrics && (
          <div className="p-6 bg-gradient-to-r from-ui-1 to-transparent border border-border-1 rounded-[16px]">
            <p className="text-[14px] font-medium text-text-secondary">
              <span className="text-text-primary font-semibold">Notable: </span>
              {creator.notableMetrics}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <h2 className="text-[20px] font-bold text-text-primary">About</h2>
          <p className="text-[15px] text-text-secondary leading-relaxed max-w-4xl">
            {creator.bio}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-ui-1 border border-border-1 rounded-[24px]">
            {creator.targetAudience && creator.targetAudience.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[14px] font-bold text-text-primary uppercase tracking-wider">Target Audience</h3>
                <div className="flex flex-wrap gap-2">
                  {creator.targetAudience.map((audience, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 text-[13px] text-text-secondary bg-ui-2/50 border border-border-1 rounded-[8px]"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
            )}
  
            {creator.useCases && creator.useCases.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[14px] font-bold text-text-primary uppercase tracking-wider">Use Cases</h3>
                <div className="flex flex-wrap gap-2">
                  {creator.useCases.map((useCase, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 text-[13px] text-text-secondary bg-ui-2/50 border border-border-1 rounded-[8px]"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            )}
  
            {creator.monetizationMethods && creator.monetizationMethods.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[14px] font-bold text-text-primary uppercase tracking-wider">Revenue Streams</h3>
                <div className="flex flex-wrap gap-2">
                  {creator.monetizationMethods.map((method, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 text-[13px] text-text-secondary bg-ui-2/50 border border-border-1 rounded-[8px]"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>

        {creator.products && creator.products.length > 0 && (
          <div className="flex flex-col gap-6 pt-8 border-t border-border-1">
            <h2 className="text-[24px] font-bold text-text-primary">Products & Offerings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creator.products.slice(0, 3).map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          </div>
        )}

        {creator.featuredTweets && creator.featuredTweets.length > 0 && (
          <div className="flex flex-col gap-8 pt-12 border-t border-border-1">
            <div className="flex flex-col gap-2">
              <h2 className="text-[24px] font-bold text-text-primary">Featured Content</h2>
              <p className="text-[14px] text-text-tertiary">Best insights and content from {creator.name}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creator.featuredTweets.map((tweetId, i) => (
                <div key={i} className="flex flex-col gap-4 p-6 bg-ui-1 border border-border-1 rounded-[24px] hover:border-border-2 transition-all group cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border-1">
                      <Image 
                        src={creator.avatar} 
                        alt={creator.name} 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[14px] font-bold text-text-primary">{creator.name}</p>
                      <p className="text-[12px] text-text-tertiary">@{creator.slug.replace('-', '')}</p>
                    </div>
                    <Twitter className="w-4 h-4 text-[#1DA1F2] ml-auto" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="h-4 w-full bg-ui-2 rounded-full animate-pulse" />
                    <div className="h-4 w-[90%] bg-ui-2 rounded-full animate-pulse" />
                    <div className="h-4 w-[80%] bg-ui-2 rounded-full animate-pulse" />
                  </div>
                  <div className="pt-4 mt-auto border-t border-border-1 flex items-center justify-between text-text-tertiary">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 rounded-full border border-current" />
                        <span className="text-[11px] font-medium">4.2K</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 rounded-full border border-current" />
                        <span className="text-[11px] font-medium">12.5K</span>
                      </div>
                    </div>
                    <span className="text-[11px]">View on X</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-16 border-t border-border-1">
          <h2 className="text-[24px] font-bold text-text-primary mb-8">More Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creators.filter(c => c.slug !== creator.slug).slice(0, 3).map((talent) => (
              <Link key={talent.id} href={`/creators/${talent.slug}`} className="flex flex-col gap-4 p-5 bg-ui-1 border border-border-1 rounded-[16px] hover:border-border-2 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border-1 shrink-0">
                    <Image 
                      src={talent.avatar} 
                      alt={talent.name} 
                      width={48} 
                      height={48} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[14px] font-semibold text-text-primary group-hover:opacity-80 transition-opacity">
                      {talent.name}
                    </h3>
                    <p className="text-[12px] text-text-tertiary">
                      {talent.category}
                    </p>
                  </div>
                </div>
                <p className="text-[13px] text-text-secondary line-clamp-2">
                  {talent.seoShortDescription}
                </p>
                {talent.notableMetrics && (
                  <p className="text-[11px] text-text-tertiary font-medium">
                    {talent.notableMetrics.split('|')[0].trim()}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
