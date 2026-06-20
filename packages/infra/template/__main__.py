import pulumi
from pulumi_cloudflare import DnsRecord, get_zone
from pulumi_github import Repository
from pulumiverse_doppler import Project as DopplerProject, Secret as DopplerSecret
from pulumiverse_sentry import SentryProject, SentryTeam

import stripe as stripe_provider
import supabase as supabase_provider

config = pulumi.Config()

project_id = config.require("project_id")
project_name = config.require("project_name")
description = config.require("description")
price_cents = config.require_int("price_cents")

supabase_org_id = config.require_secret("supabase_org_id")
cloudflare_zone_id = config.require_secret("cloudflare_zone_id")
stripe_secret_key = config.require_secret("stripe_secret_key")

stripe_provider_provider = stripe_provider.Provider(
    "stripe-provider",
    api_key=stripe_secret_key,
)

github_repo = Repository(
    f"repo-{project_id}",
    name=project_id,
    description=description,
    visibility="private",
    auto_init=True,
)

sent_team = SentryTeam("project-team", slug=project_id)

sentry_project = SentryProject(
    f"sentry-{project_id}",
    organization=config.require("sentry_org"),
    team=sent_team.id,
    name=project_name,
    slug=project_id,
    platform="python",
)

supabase_project = supabase_provider.Project(
    f"supabase-{project_id}",
    org_id=supabase_org_id,
    name=project_name,
    region="us-east-1",
    plan="free",
)

doppler_project = DopplerProject(
    f"doppler-{project_id}",
    name=project_id,
    description=description,
)

doppler_supabase_url = DopplerSecret(
    f"doppler-supabase-url-{project_id}",
    project=doppler_project.name,
    name="SUPABASE_URL",
    value=supabase_project.database_host.apply(
        lambda h: f"https://{h}.supabase.co"
    ),
)

doppler_supabase_anon_key = DopplerSecret(
    f"doppler-supabase-anon-{project_id}",
    project=doppler_project.name,
    name="SUPABASE_ANON_KEY",
    value=supabase_project.anon_key,
)

doppler_supabase_service_key = DopplerSecret(
    f"doppler-supabase-service-{project_id}",
    project=doppler_project.name,
    name="SUPABASE_SERVICE_KEY",
    value=supabase_project.service_role_key,
)

stripe_product = stripe_provider.Product(
    f"product-{project_id}",
    name=project_name,
    description=description,
    active=True,
    opts=pulumi.ResourceOptions(provider=stripe_provider_provider),
)

stripe_price = stripe_provider.Price(
    f"price-{project_id}",
    product=stripe_product.id,
    unit_amount=price_cents,
    currency="aud",
    recurring={"interval": "month"},
    opts=pulumi.ResourceOptions(provider=stripe_provider_provider),
)

zone = get_zone(zone_id=cloudflare_zone_id)

dns_api = DnsRecord(
    f"dns-api-{project_id}",
    zone_id=zone.id,
    name=f"api.{project_id}",
    type="CNAME",
    value=supabase_project.database_host.apply(
        lambda h: f"{h}.supabase.co"
    ),
    proxied=False,
    ttl=300,
)

dns_app = DnsRecord(
    f"dns-app-{project_id}",
    zone_id=zone.id,
    name=project_id,
    type="CNAME",
    value=supabase_project.database_host.apply(
        lambda h: f"{h}.supabase.co"
    ),
    proxied=True,
    ttl=1,
)

pulumi.export("project_id", project_id)
pulumi.export("supabase_project_id", supabase_project.id)
pulumi.export("supabase_url", supabase_project.database_host)
pulumi.export("stripe_product_id", stripe_product.id)
pulumi.export("stripe_price_id", stripe_price.id)
pulumi.export("github_repo_url", github_repo.html_url)
pulumi.export("sentry_project_id", sentry_project.id)
pulumi.export("doppler_project", doppler_project.name)
